# SWKA JSON-API Proxy

This project uses [ka-mensa-fetch](https://github.com/meyfa/ka-mensa-fetch) to fetch canteen plans from Studierendenwerk Karlsruhe's website
and returns them in the recently discontinued JSON-API format previously found at https://www.sw-ka.de/en/json_interface/canteen/.

Its sole purpose is to allow applications that still use the old API to keep working without the immediate need to migrate to a different data source.

New projects are strongly encouraged to use [ka-mensa-fetch](https://github.com/meyfa/ka-mensa-fetch) or a different data source directly.

## Usage

1. check out the code
2. install dependencies
    ```shell
    npm install
    ```
3. run the application with node.js
    ```shell
    node app.js
    ```

The application defaults to listening on port 8080.
You can set a different port in `config.js` or use a local configuration override file (`config.local.js`).

## Known limitations

* The limitations of [ka-mensa-fetch](https://github.com/meyfa/ka-mensa-fetch) apply:
  as the web view for the visually impaired is used for getting the canteen plans, only price category 1 (students) is available.
  This appears to be a bug on the SW-KA website.
* To preserve compatibility with the legacy API format, some traits are not returned (e.g., there is no property for MSC).
