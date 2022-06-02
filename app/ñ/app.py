from flask import Flask,  render_template, request, redirect, url_for, session # pip install Flask
from os import path #pip install notify-py
from notifypy import Notify

import cx_Oracle

cx_Oracle.init_oracle_client(lib_dir=r"D:\Program Files\instantclient_21_3")

connection = cx_Oracle.connect(user="admin", password="Password2$$$$$$", dsn="db20220531223256_high")

app = Flask(__name__)
#mysql = MySQL(connection)

@app.route('/')
def home():
    return render_template("index.html")    

@app.route('/login', methods= ["GET", "POST"])
def login():

    notificacion = Notify()

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        cur = connection.cursor()
        cur.execute("SELECT * FROM users WHERE email=%s",(email,))
        user = cur.fetchone()
        cur.close()

        if len(user)>0:
            if password == user["password"]:
                session['name'] = user['name']
                session['email'] = user['email']
                return render_template("index.html")

            else:
                notificacion.title = "Error de Acceso"
                notificacion.message="Correo o contraseña no valida"
                notificacion.send()
                return render_template("login.html")
        else:
            notificacion.title = "Error de Acceso"
            notificacion.message="No existe el usuario"
            notificacion.send()
            return render_template("login.html")
    else:
        
        return render_template("login.html")

if __name__ == '__main__':
    app.secret_key = "pinchellave"
    app.run(debug=True)