Rails.application.routes.draw do

  root 'boards#index'
  resources :boards

  resources :lists, only: %i[create destroy update]
  resources :cards, only: %i[create destroy update]

end
