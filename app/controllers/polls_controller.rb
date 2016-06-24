class PollsController < ApplicationController
  skip_before_filter :unauthenticated_redirect

  def destroy
  end

  def create
    @folder = current_user.folders.find(params[:folder_id])
    @poll = new_poll(@folder)
    if @poll.save
      choices_params.each do |choice|
        @poll.choices.new(content: choice, votes: 0).save
      end
      redirect_to "/polls/#{session[:user_id]}/#{@folder.id}/#{@poll.id}"
    else
      redirect_to user_path(current_user)
    end
  end

  def show
    poll_user = User.find(params[:user_id])
    folder = poll_user.folders.find(params[:folder_id])
    @poll = folder.polls.find(params[:id])
    if is_admin(poll_user)
      @poll.unseen_responses = 0
      @poll.save
    end
    @props = {
      user_id: poll_user.id,
      folder_id: folder.id,
      admin: is_admin(poll_user),
      choices: @poll.choices,
      poll: @poll
    }
  end

  def new
    @props = {
      folders: current_user.folders,
      selectedFolderId: params[:folder_id].to_i,
      authenticity_token: form_authenticity_token
    }
  end

  def take
    user = User.find(params[:user_id])
    folder = user.folders.find(params[:folder_id])
    @poll = folder.polls.find(params[:id])
    @poll.active = false if @poll.created_at.to_date >= Date.today
    @poll.save
    redirect_to "/polls/#{params[:user_id]}/#{folder.id}/#{@poll.id}" unless (@poll.active && !polls_taken.include?(@poll.id))
    @props = {
      poll_id: @poll.id,
      folder_id: folder.id,
      user_id: user.id,
      authenticity_token: form_authenticity_token,
      choices: @poll.choices
    }
  end

  def update
    user = User.find(params[:user_id])
    folder = user.folders.find(params[:folder_id])
    poll = folder.polls.find(params[:id])
    choice = poll.choices.find(params[:choice_id])
    increment_vote(poll, choice)
    mark_taken(poll.id)
    redirect_to "/polls/#{params[:user_id]}/#{params[:folder_id]}/#{params[:id]}"
  end

  private
  def poll_params
    params.require(:poll).permit(:question, :expiration)
  end

  def choices_params
    params.require(:choices)
  end

  def increment_vote(poll, choice)
    choice.votes = choice.votes + 1
    choice.save
    poll.responses = poll.responses + 1
    poll.unseen_responses = poll.unseen_responses + 1
    poll.save
  end

  def is_admin(poll_user)
    current_user == poll_user
  end

  def new_poll(folder)
    folder.polls.new(responses: 0,
    unseen_responses: 0,
    active:true,
    question: poll_params[:question],
    expiration: Date.parse(poll_params[:expiration]))
  end

  def mark_taken(poll_id)
    polls_taken << poll_id
  end
  def polls_taken
    session[:polls_taken] ||= []
  end
end
