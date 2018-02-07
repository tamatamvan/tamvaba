export default function ({ store, redirect }) {
  console.log('state login ', store.state.isLogin)
  if (store.state.isLogin) {
    redirect('/')
  }
}
