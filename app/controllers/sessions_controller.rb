class SessionsController < ApplicationController
  def login
    @user = User.find_by(username: session_params[:username])
    puts @user.nil?
    redirect_to root_path and return if @user.nil?
    session[:user_id] = @user.id
    redirect_to user_path(@user) if @user.authenticate(session_params[:password])
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private
  def session_params
    params.require(:session).permit(:username, :password)
  end
end
