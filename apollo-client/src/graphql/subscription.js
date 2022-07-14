import gql from 'graphql-tag'

export const SUBSCRIPTION_POST = gql`
  subscription {
      post{
          mutation
          data {
              id
              titile
              auther
          }
      }
  }
`