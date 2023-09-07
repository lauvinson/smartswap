// @ts-ignore
import ChromeDinoGame from 'react-chrome-dino'
// @ts-ignore
function Error({ statusCode }) {
  switch (statusCode) {
    case 404:
      return (
        <p>
          <ChromeDinoGame />
        </p>
      )
    default:
      return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
  }
}

// @ts-ignore
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
