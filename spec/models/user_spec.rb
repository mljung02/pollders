require 'rails_helper'

describe User do
  before do
    @user = User.new(username: "some_username",
                     password: "password",
                     password_confirmation: "password")
  end

  it 'is valid with a username, password, and password_confirmation' do
    expect(@user.valid?).to be_truthy

    @user.username = nil

    expect(@user.valid?).to eq false
  end

  it 'authenticates only with the matching password' do
    expect(@user.authenticate('passwordd')).to eq false
    expect(@user.authenticate('password')).to eq @user
  end

  it 'can have folders' do
    expect(@user.folders.new.valid?).to be false
    expect(@user.folders.new(name: 'general').valid?).to eq true
  end

  it 'must have a unique name' do
    duplicate_user = @user.dup
    @user.save
    expect(duplicate_user.valid?).to eq false
  end
end
