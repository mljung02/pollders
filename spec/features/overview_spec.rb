require 'rails_helper'

describe 'the user homepage', type: :feature do
  before do
    @user = User.new(id: 154, username: 'my_username', password: 'asdf', password_confirmation: 'asdf')
    @user.folders.new(name: 'General')
  end

  context 'as an unauthenticated user' do
    it 'redirects me to the signin page' do
      visit user_path(@user)

      expect(page).to have_current_path(root_path)
    end
  end

  context 'as an authenticated user' do
    before do
      page.set_rack_session(user_id: 154)
      allow(User).to receive(:find) { @user }
    end

    it 'redirects me to my homepage if I try to visit another user' do
      visit user_path(165)

      expect(page).to have_current_path(user_path(@user))
    end

    it 'shows my folder', js:true do
      visit user_path(@user)

      expect(find('.selected-folder').text).to eq 'General'
    end
  end
end
