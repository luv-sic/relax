import gql from 'gql-tag'

export const GET_MOVIE = gql`
  query getMovie($title: String) {
    Movie(title: $title) {
      releaseDate
      actors {
        name
      }
    }
  }
`
