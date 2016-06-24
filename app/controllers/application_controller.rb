class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def unauthenticated_redirect
    redirect_to root_path unless session[:user_id].present?
  end

  def current_user
    return nil unless session[:user_id].present? && session[:user_id].to_i > 0
    User.find(session[:user_id])
  end

  def logged_in?
    return current_user.present?
  end
end
