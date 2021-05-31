# Nodejs Developer Test

## The Task

Create a simple node service that provides provides some endpoints to allow the listing and updating of a
list of countries and their population. This task should take 2-3 hours but don't worry if you aren't able to 
complete all items, just make sure to show your understanding of the core technologies we use.

1. Fork this repo
2. Create an endpoint that allows the listing of the countries using the method from `src/api/country.ts`
3. Create an endpoint to fetch all of the countries sorted by their population
4. Allow the populations to be updated
5. Allow countries to be updated
6. Allow countries to be deleted 
7. Add authentication using the `src/api/authenticate.ts` method
8. When you're done commit your code and create a pull request

Bonus points for

1. Storing the data in Redis
2. Allowing the app to be run from a docker-compose file

A basic project outline has been created to help you get started quickly but feel free to start from scratch if you have a preferred setup.

Feel free to use the internet including Google and Stackoverflow to help with the task

## Any questions?

Please just ask.

Good luck and thanks for taking the time to complete this task!

+++++++++++++++++++++++++++++++++++++++++++++++++++
To test the app:

npm start

In another terminal run the following commands

To list all the countries:

curl -X GET -H "Content-Type: application/json" -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" "localhost:3000/countries"

To fetch all the countries with sort pn population in asc

curl -X GET -H "Content-Type: application/json" -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" http://localhost:3000/countries?sort=asc

To fetch all the countries with sort pn population in desc


curl -X GET -H "Content-Type: application/json" -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" http://localhost:3000/countries?sort=desc

To insert new country data

curl --request POST 'localhost:3000/countries' \
--header 'Content-Type: application/json' \
-H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \
--data-raw '{
    "name": "India",
    "code": "IND",
    "population":1400
}'

To delete the a country

curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" "localhost:3000/countries/hD2DMRo1tRT"

To fetch a country

curl -X GET -H "Content-Type: application/json" -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" "localhost:3000/countries/IK65_n4OQww"

To update the population of a country

curl --request PATCH "localhost:3000/users/IK65_n4OQww" \
--header 'Content-Type: application/json' \
-H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \

--data-raw '{
    "population": 2323000
}'
