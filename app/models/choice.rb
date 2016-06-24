class Choice < ActiveRecord::Base
  belongs_to :folder

  validates :content, presence: true
  validates :votes, presence: true
end
