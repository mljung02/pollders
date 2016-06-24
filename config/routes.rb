Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  resources :users do
    resources :folders, only: [:create, :destroy]
  end

  root 'welcome#signin'
  post 'login' => 'sessions#login'
  get 'logout'  => 'sessions#destroy'

  get 'folders/:folder_id/polls/new' => 'polls#new'

  post 'polls/create' => 'polls#create'
  get 'polls/:user_id/:folder_id/:id/take' => 'polls#take'
  get 'polls/:user_id/:folder_id/:id' => 'polls#show'
  post 'polls/:user_id/:folder_id/:id' => 'polls#update'
end
