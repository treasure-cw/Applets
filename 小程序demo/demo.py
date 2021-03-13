from flask import Flask, request, json
import pymysql
import sys

app = Flask(__name__)

@app.route('/didian',methods=['GET','Post'])
def didain():
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select stationname from station"
    cursor.execute(sql)
    rs = cursor.fetchall()
    strr = ""
    for x in range(len(rs)):
        for y in range(len(rs[x])):
            if y != len(rs[x]) - 1:
                strr += (str(rs[x][y]) + ",")
            else:
                strr += str(rs[x][y])
        if x != len(rs) - 1:
            strr += "!"
    if strr == "":
        return 'error'
    return strr


@app.route('/addstation', methods=['GET', 'POST'])
def addsta():
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select * from station order by stationid DESC "
    cursor.execute(sql)
    rs1 = cursor.fetchone()
    if rs1 == None:
        idstr = "1001"
    else:
        idnum = int(rs1[0]) + 1
        idstr = str(idnum)
    name = request.values.get('name')
    sql = "insert into station values('{0}','{1}')".format(idstr, name)
    cursor.execute(sql)
    conn.commit()
    return "ok"


@app.route('/person',methods=['GET','POST'])
def person():
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select * from driver"
    cursor.execute(sql)
    rs = cursor.fetchall()
    strr = ""
    for x in range(len(rs)):
        for y in range(len(rs[x])):
            if y != len(rs[x]) - 1:
                strr += (str(rs[x][y]) + ",")
            else:
                strr += str(rs[x][y])
        if x != len(rs) - 1:
            strr += "!"
    if strr == "":
        return 'error'
    return strr

@app.route('/find', methods=['GET', 'POST'])
def find():
    date1 = request.values.get('date1')
    busid = request.values.get('busid')
    stop1 = request.values.get('stop1')
    stop2 = request.values.get('stop2')
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    str1 = ""
    lis = []
    for i in range(int(stop1), int(stop2)):
        sql = "select seatid from seat where busid='{}' and stop={} and busdate='{}'".format(busid, i, date1)
        cursor.execute(sql)
        rs = cursor.fetchall()
        try:
            for x in range(len(rs)):
                for y in range(len(rs[x])):
                    lis.append(str(rs[x][y]))
        except:
            return str1
    conn.close()
    lis = list(set(lis))
    for l in range(len(lis)):
        if l != len(lis) - 1:
            str1 += (str(lis[l]) + '?')
        else:
            str1 += str(lis[l])
    return str1


@app.route('/load',methods=['GET','POST'])
def load():
    username = request.values.get('username')
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select busid,seatid,stationname1,stationname2,price,opendate from orders where username='{}'".format(username)
    cursor.execute(sql)
    rs = cursor.fetchall()
    strr = ""
    for x in range(len(rs)):
        for y in range(len(rs[x])):
            if y != len(rs[x]) - 1:
                strr += (str(rs[x][y]) + ",")
            else:
                strr += str(rs[x][y])
        if x != len(rs) - 1:
            strr += "!"
    if strr == "":
        return 'error'
    return strr


@app.route('/buy', methods=['GET', 'POST'])
def buy():
    pt1 = request.values.get('pt1')
    pt2 = request.values.get('pt2')
    username = request.values.get('username')
    date1 = request.values.get('date1')
    time1 = request.values.get('time1')
    busid = request.values.get('busid')
    stop1 = request.values.get('stop1')
    stop2 = request.values.get('stop2')
    seatid = request.values.get('seatid')
    mails = request.values.get('mails')
    stopone = int(stop1)
    stoptwo = int(stop2)
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    for i in range(stopone, stoptwo):
        sql = "insert into seat values('{0}',{1},'{3}','{2}',{4})".format(busid, i, seatid, date1, 1)
        cursor.execute(sql)
        conn.commit()
    sql = "select * from orders order by orderid DESC "
    cursor.execute(sql)
    rs1 = cursor.fetchone()
    if rs1 == None:
        idstr = "1000001"
    else:
        idnum = int(rs1[0]) + 1
        idstr = str(idnum)
    sql = "insert into orders values('{}','{}','{}','{}','{}','{}',{},'{}')".format(idstr, username, busid, seatid, pt1, pt2,
                                                                                    float(mails) * 0.4, date1 +" "+ time1+".000")
    cursor.execute(sql)
    conn.commit()
    conn.close()
    return 'ok'


@app.route('/change',methods=['GET','POST'])
def change():
    pa = request.values.get('pwd')
    name = request.values.get('nme')
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "update user set userpwd='{0}' where username='{1}'".format(pa,name)
    cursor.execute(sql)
    try:
        cursor.execute(sql)
        conn.commit()
        conn.close()
        return 'ok'
    except:
        conn.rollback()
        conn.close()
        return 'error'
    

@app.route("/forget",methods=['GET','POST'])
def forget():
    name = request.values.get('username')
    cd = request.values.get('idcard')
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select userpwd,usercard from user where username like '{0}'".format(name)
    cursor.execute(sql)
    rs = cursor.fetchone()
    if rs != None:
        if rs[1]==cd:
            return str(rs[0])
        else:
            return "error"
    return 'error1'

@app.route('/adduser', methods=['GET', 'POST'])
def add():
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select * from user order by userid DESC "
    cursor.execute(sql)
    rs1 = cursor.fetchone()
    if rs1 == None:
        idstr = "10000001"
    else:
        idnum = int(rs1[0]) + 1
        idstr = str(idnum)
    name = request.values.get('username')
    pa = request.values.get('pwd')
    cd = request.values.get('idcard')
    sql = "insert into user values('{0}','{1}','{3}','{2}',0)".format(idstr, name, pa, cd)
    cursor.execute(sql)
    conn.commit()
    return sql

@app.route("/station",methods=['GET','POST'])
def station():
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select * from station"
    cursor.execute(sql)
    rs = cursor.fetchall()
    strr = ""
    for x in range(len(rs)):
        for y in range(len(rs[x])):
            if y != len(rs[x]) - 1:
                strr += (str(rs[x][y]) + ",")
            else:
                strr += str(rs[x][y])
        if x != len(rs) - 1:
            strr += "!"
    if strr == "":
        return 'error'
    return strr

@app.route("/train",methods=['GET','POST'])
def train():
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select a.busid,a.stationname,b.stationname,a.arrdate,a.arrtime from bus_num a,bus_num b where a.busid=b.busid and b.stop>a.stop and a.arrdate=b.arrdate"
    cursor.execute(sql)
    rs = cursor.fetchall()
    strr = ""
    for x in range(len(rs)):
        for y in range(len(rs[x])):
            if y != len(rs[x]) - 1:
                strr += (str(rs[x][y]) + ",")
            else:
                strr += str(rs[x][y])
        if x != len(rs) - 1:
            strr += "!"
    if strr == "":
        return 'error'
    return strr

@app.route('/search', methods=['GET', 'POST'])
def search():
    p1 = request.values.get('position1')
    p2 = request.values.get('position2')
    d1 = request.values.get('data1')
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = "select a.busid,a.arrtime,b.mails-a.mails,a.stop,b.stop from bus_num a,bus_num b  where a.busid=b.busid and a.stationname like '{0}' and b.stationname like '{1}' and a.arrdate = '{2}'".format(p1, p2, d1)
    cursor.execute(sql)
    rs = cursor.fetchall()
    strr=""
    for x in range(len(rs)):
        for y in range(len(rs[x])):
            if y!=len(rs[x])-1:
                strr+=(str(rs[x][y])+",")
            else:
                strr += str(rs[x][y])
        if x != len(rs)-1:
            strr+="!"
    if strr=="":
        return 'error'
    return strr


@app.route('/hhh', methods=['GET', 'POST'])
def hellow_world():   
    name = request.values.get('username')
    pa = request.values.get('pwd')
    cd = request.values.get('idcard')
    conn = pymysql.connect("localhost", "root", "123456", "mybus")
    cursor = conn.cursor()
    sql = 'select * from user where username like ' + "'%s'" % name
    cursor.execute(sql)
    rs = cursor.fetchone()
    strr = ""
    try:
        for x in range(len(rs)):
            if x != len(rs) - 1:
                strr += (str(rs[x]) + ",")
            else:
                strr += str(rs[x])
        if rs[3] == pa and rs[2][-4:]==cd:
            return strr
        else:
            return 'error'
    except TypeError:
        return 'error'
if __name__ == '__main__':
    app.run()
