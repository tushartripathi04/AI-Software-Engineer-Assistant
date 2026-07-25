
from flask import Flask, render_template, request,redirect,url_for,session
import mysql.connector
from mysql.connector import Error

db_config = {
    'host': 'localhost',
    'database': 'geeklogin',
    'user': '*******',
    'password': '**********'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MYSQl: {e}")
        return None
    

app = Flask(__name__)
app.secret_key = 'mishra'

@app.route('/signup',methods=['GET','POST'])
def signup():
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            email = request.form['email']

            connection = get_db_connection()
            if not connection:
                return "failed to connect to database."
            cursor = connection.cursor()
            try:

                    
                    cursor.execute("INSERT INTO users (username, email, password) " \
                    "VALUES (%s, %s, %s)", (username, email, password))
                    connection.commit()
                    return redirect(url_for('signin'))
            except Error as e:
                    return f"Error: {e}"
            finally:
                    cursor.close()
                    connection.close()
            
        return render_template('signup.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        connection = get_db_connection()
        if not connection:
            return "Failed to connect to the database."

        cursor = connection.cursor(dictionary=True) 
        try:
            
            cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            user = cursor.fetchone()

            if user:
                session['username'] = user['username']
                return redirect(url_for('dashboard'))
                
            else:
                return "<h1>Invalid username or password.</h1>"
        except Error as e:
            return f"Error: {e}"
        finally:
            cursor.close()
            connection.close()
    
    
    return render_template('signin.html')

@app.route('/dashboard')
def dashboard():
    
    if 'username' in session:
        
        return render_template('dashboard.html', username=session['username'])
    else:
       
        return  render_template('signin.html')


@app.route('/logout')
def logout():
    
    session.pop('username', None)
    
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
                