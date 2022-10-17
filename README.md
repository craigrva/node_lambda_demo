In terminal run: 

docker-compose up -d
serverless deploy --stage local

from the output of the serverless deploy, get the http endpoint provided and add /soap to the end

send an XML object as the body of a POST request to the above endpoint; i used the outbound_1302.txt file

the server response should be the object containing the 'deceasedTime' key
