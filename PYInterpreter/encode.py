import base64

# This is for dev purposes

code = '''
print('hey')
print('hey')
for i in range(50):
    print('hey loop')
def test():
    return 1
'''
encoded_code = base64.b64encode(code.encode('utf-8')).decode('utf-8')
# 37601
print('''curl -X POST -H "Content-Type: application/json" -d '{"code": "''' + encoded_code + '''", "auth":"123"}' http://127.0.0.1:8080/pyinterpreter''')
