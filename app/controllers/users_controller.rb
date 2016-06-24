class UsersController < ApplicationController
  def show
    redirect_to root_path and return unless session[:user_id].present?
    user = User.find(session[:user_id])
    polls = user.folders.map do |folder|
      folder.polls
    end
    redirect_to user_path(user) unless session[:user_id].to_i == params[:id].to_i
    @props = { username: user.username,
      folders: user.folders,
      polls: polls,
      user_id: user.id.to_s,
      authenticity_token: form_authenticity_token,
    }
  end

  def new
    redirect_to user_path(current_user) if logged_in?
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      @user.folders.new(name: 'General').save
      redirect_to @user, notice: 'Account Created!'
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password,
                                 :password_confirmation)
  end
end
