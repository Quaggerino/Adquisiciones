import os
from re import X
import sys
import cx_Oracle
from flask import Flask, render_template, request, session
from notifypy import Notify

cx_Oracle.init_oracle_client(lib_dir=r"..\client")

connection = cx_Oracle.connect(user="admin", password="Password2$$$$$$", dsn="db20220531223256_high")

cursor = connection.cursor()

app = Flask(__name__)
app.debug = True


@app.route('/')
def home():
    return render_template("login.html") 

@app.route('/login', methods= ["GET", "POST"])
def login():

    notificacion = Notify()

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        cur = connection.cursor()

        cur.execute("SELECT * FROM users WHERE email = :e",e = email)

        user = cur.fetchone()

        cur.close()

        if user==None:
            notificacion.title = "Error de Acceso"
            notificacion.message="No existe el usuario"
            notificacion.send()
            return render_template("login.html")

        if len(user)>0:
            if password == user[1]:
                session['name'] = user[2]
                session['email'] = user[0]
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
