class FoldersController < ApplicationController
  skip_before_filter :unauthenticated_redirect

  def create
    @user = User.find(params[:user_id])
    @folder = @user.folders.new(name: params[:folder_name])
    if @folder.save
      render json: { folders: @user.folders }, status: 201
    else
      render json: { error: 'Folder not created '}, status: 404
    end
  end

  private
end
