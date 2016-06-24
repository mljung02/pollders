require 'rails_helper'

describe 'the signup process', type: :feature do
  before do
    @user = User.new(username: 'my_username', password: 'asdf', password_confirmation: 'asdf')

    visit new_user_path
    fill_out_user_form

    allow(User).to receive(:new) { @user }
    allow(@user.folders).to receive(:new)

    click_on 'Create Account'
  end

  it 'allows me to sign up and redirects me to my home page' do
    expect(User).to have_received(:new).with(username: 'my_username', password: 'asdf', password_confirmation: 'asdf')

    expect(page).to have_current_path(user_path(@user))
  end

  it 'creates me with a folder named General' do
    expect(@user.folders.size).to eq 1
    expect(@user.folders[0].name).to eq 'General'
  end
end

def fill_out_user_form
  fill_in 'user[username]', with: 'my_username'
  fill_in 'user[password]', with: 'asdf'
  fill_in 'user[password_confirmation]', with: 'asdf'
end
