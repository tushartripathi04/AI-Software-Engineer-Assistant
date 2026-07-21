from app.auth.hashing import hash_password, verify_password

password = "Tushar123"

hashed = hash_password(password)

print("Original Password :", password)
print("Hashed Password   :", hashed)

print("Verification:", verify_password(password, hashed))