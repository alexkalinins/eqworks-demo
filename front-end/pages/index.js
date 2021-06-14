import NavBar from "../components/NavBar";
import Table from "../components/Table";

/**
 * The home page of the website.
 * @returns react component
 */
export default function Home() {
  return (
    <div>
      <main>
        <NavBar />
        <h2>Searchable Tables</h2>
        Each column of the table can be searched by clicking on the column
        title.
        <Table
          data={[
            { number: 1, message: "hello world!", author: "Alex" },
            { number: 2, message: "i'm", author: "Alex" },
            { number: 3, message: "a searchable", author: "Alex" },
            { number: 4, message: "table!", author: "Alex" },
          ]}
        />
        This table visualizes data that is formatted as an array of objects:
        <pre>
          {`
data = [
  { number: 1, message: "hello world!", author: "Alex" },
  { number: 2, message: "i'm", author: "Alex" },
  { number: 3, message: "a searchable", author: "Alex" },
  { number: 4, message: "table!", author: "Alex" },
]

`}
        </pre>
        <h2>Rate-Limited API</h2>
        The API is rate limited, such that an ip address can make the same
        request every 5 seconds. The rate limiting is done by recording the
        request in MongoDB via Mongoose. This approach is compatible with
        serverless architecture, since the 'session' is not stored locally but
        on MongoDB. However, if the API is not used frequently enough, the
        entries may be deleted a few seconds after the expiration.
        <h2>About This Webapp</h2>
        <ul>
          <li>
            Next.js: the framework. If needed, a custom express server could be
            used to serve the front-end.
          </li>
          <li>
            Searchable Tables: made from scratch, using an open-source component
            for highlighting (
            <a href="https://www.npmjs.com/package/react-highlighter">
              react-highlighter
            </a>
            ). The HTML Tables were not used for accessibility reasons.
          </li>
          <li>
            Graphs: made using{" "}
            <a href="https://www.npmjs.com/package/react-chartjs-2">
              react-chartjs-2
            </a>
            , a wrapper of chart.js
          </li>
          <li>
            Maps: made using{" "}
            <a href="https://www.npmjs.com/package/pigeon-maps">pigeon-maps</a>{" "}
            library: a light-weight library using the open-source OpenStreetMap
            provider.
          </li>
          <li>SCSS: a more efficient way to style.</li>
          <li>Fonts: Monument Extended and Akzidenz Grotesk.</li>
        </ul>
      </main>
    </div>
  );
}
