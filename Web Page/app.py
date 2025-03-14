from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd  
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load the scalers and models
try:
    with open('SexScaler.pkl', 'rb') as f:
        sex_scaler = pickle.load(f)
    with open('SexModel.pkl', 'rb') as f:
        sex_model = pickle.load(f)
    with open('RaceScaler.pkl', 'rb') as f:
        race_scaler = pickle.load(f)
    with open('RaceModel.pkl', 'rb') as f:
        race_model = pickle.load(f)
    logger.info("Scalers and models loaded successfully.")
except Exception as e:
    logger.error(f"Error loading scalers or models: {e}")

@app.route('/predict/sex', methods=['POST'])
def predict_sex():
    try:
        data = request.json
        logger.debug(f"Received data for sex prediction: {data}")

        # Extract features from the request and convert to DataFrame
        features = pd.DataFrame([[
            data.get('victim_sex', 0), 
            data.get('weapon_handgun', 0),  
            data.get('victim_age_group', 0),  
            data.get('weapon_knife', 0),  
            data.get('victim_race', 0),  
            data.get('weapon_rifle', 0),  
            data.get('victim_count', 0)  
        ]], columns=[
            'Victim Sex', 
            'Weapon_Handgun', 
            'Victim Age Group', 
            'Weapon_Knife', 
            'Victim Race', 
            'Weapon_Rifle', 
            'Victim Count'
        ])

        logger.debug(f"Features DataFrame: {features}")

        # Scale the features
        scaled_features = sex_scaler.transform(features)
        logger.debug(f"Scaled features for sex prediction: {scaled_features}")

        prediction = sex_model.predict(scaled_features)
        logger.debug(f"Predicted sex: {prediction}")

        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        logger.error(f"Error in predict_sex: {e}")
        return jsonify({'error': str(e)}), 500
    
# Mapping for race predictions (adjust based on your model's output)
race_mapping = {
    0: "Asian/Pacific Islander",
    1: "Black",
    2: "Native American/Alaska Native",
    3: "White"
}

@app.route('/predict/race', methods=['POST'])
def predict_race():
    try:
        data = request.json
        logger.debug(f"Received data for race prediction: {data}")

        # Extract features from the request and convert to DataFrame
        features = pd.DataFrame([[
            data.get('victim_race', 0),  # Default to 0 if not provided
            data.get('victim_age_group', 0),  # Default to 0 if not provided
            data.get('weapon_handgun', 0),  # Default to 0 if not provided
            data.get('victim_sex', 0),  # Default to 0 if not provided
            data.get('victim_count', 0),  # Default to 0 if not provided
            data.get('weapon_rifle', 0),  # Default to 0 if not provided
            data.get('weapon_shotgun', 0)  # Default to 0 if not provided
        ]], columns=[
            'Victim Race', 
            'Victim Age Group', 
            'Weapon_Handgun', 
            'Victim Sex', 
            'Victim Count', 
            'Weapon_Rifle',
            'Weapon_Shotgun'
        ])

        logger.debug(f"Features DataFrame: {features}")

        # Scale the features
        scaled_features = race_scaler.transform(features)
        logger.debug(f"Scaled features for race prediction: {scaled_features}")

        # Make prediction
        prediction = race_model.predict(scaled_features)
        logger.debug(f"Predicted race: {prediction}")

        # Map numeric prediction to a human-readable label
        predicted_race = race_mapping.get(int(prediction[0]), "Unknown")
        return jsonify({'prediction': predicted_race})
    except Exception as e:
        logger.error(f"Error in predict_race: {e}")
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)