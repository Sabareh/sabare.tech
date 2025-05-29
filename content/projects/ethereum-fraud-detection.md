---
title: "Detecting & Classifying Fraudulent Ethereum Accounts"
slug: "ethereum-fraud-detection"
description: "Developed a machine-learning framework combining supervised and unsupervised methods to detect fraudulent Ethereum accounts with >85% accuracy and <5% false positives, deployed as an interactive Streamlit app."
category: "Machine Learning"
featured: true
status: "completed"
startDate: "2025-01-20"
endDate: "2025-04-15"
client: "Jomo Kenyatta University of Agriculture and Technology"
role: "Lead Researcher"
team: 1
technologies:
  - "Python"
  - "Scikit-learn"
  - "TensorFlow"
  - "XGBoost"
  - "Web3.py"
  - "Streamlit"
  - "Pandas"
  - "NumPy"
  - "Matplotlib"
  - "NetworkX"
challenges:
  - "Handling pseudonymous blockchain data and extracting meaningful features"
  - "Detecting anomalies in high-volume transaction datasets"
  - "Minimizing false positives while maintaining high detection accuracy"
  - "Integrating supervised and unsupervised methods into a cohesive pipeline"
  - "Deploying a scalable, interactive web interface for real-time analysis"
solutions:
  - "Engineered comprehensive transaction and network-based features (frequency, value distributions, centrality metrics)"
  - "Applied Isolation Forest and Autoencoder models for unsupervised anomaly detection"
  - "Trained Random Forest and XGBoost classifiers for fraud categorization"
  - "Combined unsupervised and supervised methods through an ensemble framework"
  - "Developed and deployed a Streamlit application for dynamic visualization and reporting"
results:
  - "Achieved 87% detection accuracy on test data"
  - "Maintained false positive rate below 4.5%"
  - "Processed over 500k Ethereum transactions without data loss"
  - "Enabled interactive analysis with real-time filtering and visualizations"
images:
  - "/projects/ethereum-fraud-architecture.png"
  - "/projects/ethereum-model-dashboard.png"
  - "/projects/ethereum-network-analysis.png"
links:
  - name: "Live Demo"
    url: "https://sabareh-ethereum-fraud-detection.streamlit.app/"
    type: "demo"
  - name: "GitHub Repository"
    url: "https://github.com/Sabareh/ethereum-fraud-detection"
    type: "code"
  - name: "Academic Paper"
    url: "/projects/ethereum-fraud-detection-paper.pdf"
    type: "documentation"
---
# Detecting & Classifying Fraudulent Ethereum Accounts

## Project Overview
This project develops a unified machine-learning framework for identifying fraudulent activity on the Ethereum blockchain. By analyzing on-chain transaction patterns and network relationships, it combines unsupervised anomaly detection with supervised classification to flag suspicious accounts. The end-to-end solution is exposed via an interactive Streamlit application, allowing users to explore anomalies, model predictions, and network graphs in real time.

## System Architecture

### Data Extraction Layer
- **Web3.py**: Connects to Ethereum nodes (e.g., via Infura or Alchemy) to stream transaction data.  
- **Etherscan API**: Supplements on-chain data with metadata (e.g., internal txns, contract events).

### Feature Engineering Module
- **Pandas & NumPy**: Cleans and aggregates transaction histories.  
- **NetworkX**: Computes graph-based metrics (centrality, clustering) to capture network effects.

### Modeling Pipeline
- **Isolation Forest & Autoencoder**: Unsupervised models to detect anomalous transaction patterns.  
- **Random Forest & XGBoost**: Supervised classifiers trained on labeled fraud samples to assign fraud scores.  
- **Ensemble Framework**: Merges unsupervised anomaly scores with classifier outputs for robust predictions.

### Deployment Interface
- **Streamlit**: Hosts the interactive dashboard, enabling dynamic filtering, threshold adjustments, and network visualizations.

## Key Challenges Solved
1. **Pseudonymous Data**  
   Extracted rich behavioral features from address-level activity despite lack of identity labels.  
2. **Scalability**  
   Processed over half a million transactions through vectorized Pandas pipelines and batch inference.  
3. **False-Positive Control**  
   Tuned ensemble thresholds to keep false alarms below 5% while preserving recall.  
4. **Model Integration**  
   Seamlessly combined unsupervised and supervised approaches into a single evaluation pipeline.  
5. **Interactive Reporting**  
   Delivered real-time insights via a user-friendly web app, accelerating investigation workflows.

## Implementation Details

```python
from web3 import Web3
import pandas as pd
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from xgboost import XGBClassifier
import streamlit as st

# Connect to Ethereum node
w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/<KEY>"))
tx = w3.eth.get_transaction("0x...")

# Feature engineering example
df = pd.DataFrame([...])  # transaction records
df['hour'] = pd.to_datetime(df.timestamp, unit='s').dt.hour
X = df[['value', 'hour', 'gas', 'degree_centrality']]

# Unsupervised detection
iso = IsolationForest(contamination=0.02).fit(X)
df['anomaly_score'] = iso.decision_function(X)

# Supervised classification
rf = RandomForestClassifier().fit(X_train, y_train)
df['fraud_prob'] = rf.predict_proba(X)[:, 1]

# Streamlit app
st.title("Ethereum Fraud Detection Dashboard")
st.dataframe(df[['from', 'to', 'value', 'fraud_prob']])
