require 'rails_helper'

describe 'the signin process', type: :feature do
  context 'as an unauthenticated user' do
    it 'lands on the signin page' do
      visit root_path

      expect(page).to have_content 'Pollders'
      expect(page).to have_field 'session[username]'
      expect(page).to have_field 'session[password]'
    end

    it 'links to the signup page' do
      visit root_path

      click_link 'Sign up'

      expect(page).to have_current_path(new_user_path)
    end

    it 'allows me to sign in and redirects me to my home page' do
      user = User.new(id: 154, username: 'my_username', password: 'asdf', password_confirmation: 'asdf')
      allow(User).to receive(:find).with(154) { user }
      allow(User).to receive(:find_by).with(username: 'my_username') { user }
      visit root_path

      fill_in 'session[username]', with: 'my_username'
      fill_in 'session[password]', with: 'asdf'

      click_on 'Log in'

      expect(page).to have_current_path(user_path(user))
    end
  end
end
