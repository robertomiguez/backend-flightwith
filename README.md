# backend-flightwith
Backend in NodeJS - Flight tickets information

### endpoints
* List of currencies:
    * GET /currencies
* List of places:
    * GET /places/UK/GBP/en-GB/?query=city
* List of queries:
    * GET /queries
* A single query: 
    * GET /queries/CITY-CITY
* Add a query:
    * POST /query
      Authorization: Bearer XXX
      {...}    
* Active a query:
    * PATCH /queries/CITY-CITY
      Authorization: Bearer XXX
      { "active": true }
* List of filter flights: (***unique document***)
    * GET /filterflights
      Authorization: Bearer XXX
* Add a new filter flights: (***unique document***)
    * POST /filterflights
      Authorization: Bearer XXX
      {...}    
* Delete a filter flights: (***unique document***)
    * DELETE /filterflights
      Authorization: Bearer XXX
* Active a filter flights: (***unique document***)
    * PATCH /active
      Authorization: Bearer XXX
      {...}    
* Grant administrator privileges a login
    * PATCH /login/grant/admin/email@somewhere.com
    Authorization: Bearer XXX
* Revoke administrator privileges a login
    * PATCH /login/revoke/admin/email@somewhere.com
    Authorization: Bearer XXX

## General info
We use:
* Express Framework
* Firebase Functions
* Firestore
