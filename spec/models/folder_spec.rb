require 'rails_helper'

describe Folder do
  before do
    user = User.new(username: "some_username",
                     password: "password",
                     password_confirmation: "password")

    @folder = user.folders.new(name: 'General')
  end

  it 'is valid with a name' do
    expect(@folder.valid?).to be_truthy

    @folder.name = nil

    expect(@folder.valid?).to eq false
  end

  it 'can have polls' do
    @folder.polls.new(responses: 0, unseen_responses: 0, active:true, question: "khi?")
    @folder.polls.new(responses: 0)
    puts @folder.name
    puts @folder.polls[0].responses
    expect(@folder.polls.size).to eq 2
    expect(@folder.polls[0].active).to eq true
    expect(@folder.polls[0].valid?).to eq true
    expect(@folder.polls[1].valid?).to eq false

  end
end
