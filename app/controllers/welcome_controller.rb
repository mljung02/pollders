class WelcomeController < ApplicationController
  def signin
    redirect_to user_path(session[:user_id]) if session[:user_id].present?
  end
end
