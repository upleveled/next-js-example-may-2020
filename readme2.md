# Next.js Example

- Next.js
- Jest
- Cypress.io

## Database Setup

Copy the `.env.example` file to `.env` and add the database connection information.

You'll also need PostgreSQL for this.

### PostgreSQL Installation instructions

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Run the following queries inside of `psql` to set up the database and the user:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Then, to connect to the database using this new user, quit `psql` and reconnect:

```sh
\q
psql -U <user name> <database name>
```
