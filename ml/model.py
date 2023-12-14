import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import argparse
import requests
from PIL import Image
from io import BytesIO

def load_and_preprocess_image(image_path):
    if image_path.startswith("http"):
        # Load image from URL
        response = requests.get(image_path)
        img = Image.open(BytesIO(response.content))
    else:
        # Load local image
        img = image.load_img(image_path, target_size=(224, 224))

    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def extract_features(image_path, model):
    img_array = load_and_preprocess_image(image_path)
    features = model.predict(img_array)
    return features.flatten()

def calculate_cosine_similarity(reference_features, comparison_features):
    similarity = cosine_similarity([reference_features], [comparison_features])
    return similarity[0][0]

def main():
    parser = argparse.ArgumentParser(
        description="Compare images and calculate similarity score using a pre-trained model."
    )
    parser.add_argument("reference_image", help="URI of the reference image")
    parser.add_argument(
        "comparison_images", nargs="+", help="URIs of the images for comparison"
    )

    args = parser.parse_args()

    # Load pre-trained ResNet50 model
    model = ResNet50(weights="imagenet", include_top=False, pooling="avg")

    # Extract features from the reference image
    reference_features = extract_features(args.reference_image, model)

    for comparison_image_uri in args.comparison_images:
        # Extract features from each comparison image
        comparison_features = extract_features(comparison_image_uri, model)

        # Calculate cosine similarity
        similarity_score = calculate_cosine_similarity(
            reference_features, comparison_features
        )
        print(
            f"Similarity score between {args.reference_image} and {comparison_image_uri}: {similarity_score:.4f}"
        )

if __name__ == "__main__":
    main()
