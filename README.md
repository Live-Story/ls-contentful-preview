# Live Story Contentful Preview

Render a Live Story Contentful entry

## Settings
On deployment stage, set your Contentful preview access token as environment variable `REACT_APP_ACCESS_TOKEN`

## Usage

Once deployed, on Contenful Preview URL, select your Content type Live Story and, as Preview URL, set:

`https://[your-deployed-instance-domain]?space={entry.sys.space.sys.id}&environment={env_id}&entry={entry.sys.id}&locale={locale}&ls_id={entry.fields.id}&ls_type={entry.fields.type}`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
