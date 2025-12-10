import json
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer, util

# -----------------------------
# MongoDB setup
# -----------------------------
client = MongoClient("mongodb://localhost:27017")  # adjust if needed
db = client["quizdb"]
answers_collection = db["answers"]

# Fetch last 30 answers sorted by insertion order
data = list(answers_collection.find().sort("_id", -1).limit(30))

if not data:
    print(json.dumps([]))
    exit()

# Extract questions and user answers
questions = [item.get("question", "") for item in data]
answers = [item.get("answer", "") for item in data]

# -----------------------------
# Load offline SentenceTransformer model
# -----------------------------
model = SentenceTransformer('./model_cache/all-MiniLM-L6-v2')

# -----------------------------
# Define expected answers (same length as last 30 entries)
# -----------------------------
expected_answers = [
    "A star is a luminous sphere of plasma that produces energy through nuclear fusion.",
    "Nuclear fusion is the process in which atomic nuclei combine to form a heavier nucleus, releasing energy.",
    "The color and temperature of a star are determined by its surface temperature and composition.",
    "A light-year is the distance that light travels in one year.",
    "A galaxy is a massive system of stars, and Earth is in the Milky Way galaxy.",
    "A black hole forms when a massive star collapses under its own gravity.",
    "An exoplanet is a planet outside our solar system; scientists detect them using methods like the transit method and radial velocity.",
    "Node.js is a JavaScript runtime built on Chrome's V8 engine, used for server-side development.",
    "Express.js is a web framework for Node.js that simplifies routing and middleware handling.",
    "A REST API is an API that follows REST architectural principles for communication over HTTP.",
    "useState is a React hook that allows you to add state to functional components.",
    "useEffect is a React hook that lets you perform side effects in functional components.",
    "The Big Bang Theory explains the origin of the universe; evidence includes cosmic microwave background radiation and galaxy redshift.",
    "Separating frontend and backend allows modular development, better scalability, and security.",
    "Dark matter is a form of matter inferred from gravitational effects; it is believed to exist because of galaxy rotation curves.",
    "Middleware in Express is a function that executes during the request-response cycle.",
    "A database schema defines the structure of data in a database.",
    "Redshift measures how much light from distant objects is stretched due to the universe's expansion.",
    "The life cycle of a star includes nebula, main sequence, red giant/supergiant, and white dwarf/neutron star/black hole.",
    "A planet orbits a star and has cleared its orbit, whereas a dwarf planet has not cleared its orbit.",
    "A supernova is a powerful explosion of a dying massive star.",
    "The Doppler effect is the change in frequency of a wave for an observer moving relative to the source, used in astronomy to measure star movement.",
    "A light curve is a graph of light intensity of a celestial object over time.",
    "A photon is a quantum of light, fundamental to electromagnetic radiation.",
    "Gravitational lensing is the bending of light by gravity from massive objects.",
    "Primary colors of visible light are red, green, and blue.",
    "Synchronous code runs sequentially; asynchronous code allows non-blocking execution.",
    "A closure is a function that remembers variables from its outer scope.",
    "Cosmic microwave background radiation is relic radiation from the Big Bang.",
    "A nebula is a cloud of gas and dust where stars form."
]

# Make sure expected_answers matches the number of user answers
expected_answers = expected_answers[-len(answers):]

# -----------------------------
# Grading logic
# -----------------------------
grading_results = []

for idx, (user_ans, expected_ans) in enumerate(zip(answers, expected_answers)):
    emb1 = model.encode(user_ans, convert_to_tensor=True)
    emb2 = model.encode(expected_ans, convert_to_tensor=True)
    
    sim = util.cos_sim(emb1, emb2).item()
    result = "✅ Correct" if sim > 0.7 else "❌ Incorrect"
    
    grading_results.append({
        "question": questions[idx],
        "answer": user_ans,
        "grading": {
            "result": result,
            "similarity": sim,
            "expected": expected_ans
        }
    })

# -----------------------------
# Output JSON for frontend
# -----------------------------
print(json.dumps(grading_results))
