from app.db.database import engine

try:
    connection = engine.connect()
    print("✅ Database Connected Successfully!")
    connection.close()
except Exception as e:
    print("❌ Connection Failed")
    print(e)