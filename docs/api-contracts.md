# API Contracts

## Endpoints

### Realtor/Seller Side

#### Add Property

- **Method:** POST
- **URL:** /realtor/properties
- **Request Body:**
  - `propertyId` (string): Unique identifier for the property
  - `name` (string): Name of the property
  - `location` (string): Location of the property
  - `price` (number): Price of the property
  - `sellerId` (string): Identifier of the seller

#### List Properties by Seller

- **Method:** GET
- **URL:** /realtor/properties
- **Query Parameters:**
  - `sellerId` (string): Identifier of the seller

#### Update Property

- **Method:** PUT
- **URL:** /realtor/properties/:id
- **Request Body:**
  - `name` (string): Updated name of the property (optional)
  - `location` (string): Updated location of the property (optional)
  - `price` (number): Updated price of the property (optional)

#### Remove Property

- **Method:** DELETE
- **URL:** /realtor/properties/:id
