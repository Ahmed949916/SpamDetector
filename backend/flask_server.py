from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
import pandas as pd
from sklearn.preprocessing import StandardScaler  


app = Flask(__name__)
CORS(app) 

models = {
    'LR': './Models/Logistic_Regression_feature_selection_No.pickle',
    'DT': './Models/Decision_Tree_feature_selection_No.pickle',
    'RF': './Models/RF.pickle',
    'SVM': './Models/SVM.pickle',
    'NN': './Models/NN.pickle'
}

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

col=['word_freq_make', 'word_freq_address', 'word_freq_all', 'word_freq_3d',
       'word_freq_our', 'word_freq_over', 'word_freq_remove',
       'word_freq_internet', 'word_freq_order', 'word_freq_mail',
       'word_freq_receive', 'word_freq_will', 'word_freq_people',
       'word_freq_report', 'word_freq_addresses', 'word_freq_free',
       'word_freq_business', 'word_freq_email', 'word_freq_you',
       'word_freq_credit', 'word_freq_your', 'word_freq_font', 'word_freq_000',
       'word_freq_money', 'word_freq_hp', 'word_freq_hpl', 'word_freq_george',
       'word_freq_650', 'word_freq_lab', 'word_freq_labs', 'word_freq_telnet',
       'word_freq_857', 'word_freq_data', 'word_freq_415', 'word_freq_85',
       'word_freq_technology', 'word_freq_1999', 'word_freq_parts',
       'word_freq_pm', 'word_freq_direct', 'word_freq_cs', 'word_freq_meeting',
       'word_freq_original', 'word_freq_project', 'word_freq_re',
       'word_freq_edu', 'word_freq_table', 'word_freq_conference',
       'char_freq_;', 'char_freq_(', 'char_freq_[', 'char_freq_!',
       'char_freq_$', 'char_freq_#', 'capital_run_length_average',
       'capital_run_length_longest', 'capital_run_length_total', 'spam']
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
    
    # last 3 variables
    # every sentence in capital letters
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
        print()
        #
        full_text = emailContent
        print("-==========================================",method)

        
        # Load the Random Forest model from the pickle file
        model_path = './Models/SVM.pickle'  # Make sure the path is correct
        with open(model_path, 'rb') as file:
            model = pickle.load(file)




        email_vector=conv(full_text, col)
        
        email_df = pd.DataFrame([email_vector], columns=col[:-1])
        # To load the scaler
        with open('./Models/scaler.pickle', 'rb') as f:
             scaler = pickle.load(f)
       

        
        email_scaled = scaler.transform(email_df)
        print("-----",email_scaled)
        prediction = model.predict(email_scaled)
        prediction_prob = model.predict_proba(email_scaled) 
        print(prediction_prob )

        if prediction==1:
            output='Spam with probability '+ str(prediction_prob[0][1])
        else:
            output='Not Spam with probability ' + str(prediction_prob[0][0])
       





        #
        print(subjectLine,emailContent)
        return jsonify({
            'message': 'Strings received!',
            'output': output
        }), 200
    else:
        return jsonify({'error': 'Request must be JSON'}), 400

if __name__ == '__main__':
    app.run(debug=True)
