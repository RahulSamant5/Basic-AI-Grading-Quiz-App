from sentence_transformers import SentenceTransformer

# Create and save model locally
model = SentenceTransformer('all-MiniLM-L6-v2')
model.save('./model_cache/all-MiniLM-L6-v2')
print("Model downloaded and saved in model_cache/all-MiniLM-L6-v2")
