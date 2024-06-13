from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
import pandas as pd
from sklearn.preprocessing import StandardScaler  


app = Flask(__name__)
CORS(app) 
#loading scalar
with open('scaler.pickle', 'rb') as f:
             scaler = pickle.load(f)
       
models = {
    'LR': './Models/Logistic_Regression_feature_selection_No.pickle',
    'DT': './Models/Decision_Tree_feature_selection_No.pickle',
    'RF': './Models/Random_Forest_feature_selection_No.pickle',
    'SVM': './Models/SVM_feature_selection_No.pickle',
    'NN': './Models/Neural_Network_feature_selection_No.pickle'
}
#loading file for col names


loaded_models = {}
for name, path in models.items():
    name=name.replace(" ","")
    path=path.replace(" ","")
    print(" path=",path)
    try:
        with open(path, 'rb') as file:
            loaded_models[name] = pickle.load(file)
            
        print(f"{name} model loaded successfully.")
    except FileNotFoundError:
        print(f"Error: File not found for {name}. Check the path: {path}")
    except Exception as e:
        print(f"Failed to load {name} due to: {e}")
# After loading models
print("Available models:", loaded_models.keys())



def conv(mail,columns_names,prt=False):
    vect=[]
    nb_word=len(re.findall(r'\w+',mail))
    
    #word/char freq
    mail_low=mail.lower()
    for col in columns_names[:-4]: # the last tree dont look for word/char freq
        ref=col.split("_")[2] # the columns names a in the format : word/char_freq_ref
        if ref in ["(","["]:
            ref="\\"+ref
        match_count=len(re.findall(f"({ref})",mail_low))
        if prt:
            print(ref,match_count)
        vect.append(100*match_count/nb_word)
    
    #last 3 variables
    #every sentence in capital letters
    capital =re.findall("[A-Z, ,\d,\,]{2,}",mail)
    longest=0
    sum_cap=0
    if len(capital)!=0:
        for match in capital:
            sum_cap+=len(match.replace(" ","")) # removing " " to get the total number of capital letter
            size=len(match)
            if size>longest:
                longest=size
    else :
        capital=[1]

    vect.append(sum_cap/len(capital)) # average length of uninterrupted sequences of capital letters
    vect.append(longest) # length of longest uninterrupted sequence of capital letters
    vect.append(sum_cap) # total number of capital letters in the e-mail
  
    return vect

@app.route('/api', methods=['POST'])
def handle_data():
    if request.is_json:
        data = request.get_json() 
        subjectLine = data.get('subjectLine')
        emailContent = data.get('emailContent')
        method = data.get('method')
        model = loaded_models.get(method)

        full_text = subjectLine+" "+emailContent
        
        print("\nMethod->",method)
        print("\nemailContent->",emailContent)

        data=pd.read_csv("./col.csv")
        email_vector=conv(full_text, data.columns)
        #print("After conv->",email_vector)
        email_df = pd.DataFrame([email_vector], columns=data.columns[:-1])


        # To load the scaler
        #print("Email_df->",email_df)
        
         
        email_scaled = scaler.transform(email_df)
        #print("email_scaled->",email_scaled)
        prediction = model.predict(email_scaled)
        #print("prediction->",prediction)
        prediction_prob = model.predict_proba(email_scaled) 
        #print("Prob->",prediction_prob )

        if prediction==1:
            output='Spam with Confidence '+ str(prediction_prob[0][1])+"%"
        else:
            output='Not Spam with Confidence ' + str(prediction_prob[0][0])+"%"
       

        print(subjectLine,emailContent)
        return jsonify({
            'message': 'Strings received!',
            'output': output
        }), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400

if __name__ == '__main__':
    app.run(debug=True)
