Rails.application.routes.draw do

  get 'users/new'
  devise_for :users
  # アカウント作成viewでエラー後urlが/usersになるのでリダイレクト
  get '/users', to: redirect("/users/sign_up")

  root 'boards#index'
  
  resources :boards
  resources :lists, only: %i[create destroy update]
  resources :cards, only: %i[create destroy update]

end
