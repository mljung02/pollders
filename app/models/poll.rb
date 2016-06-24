class Poll < ActiveRecord::Base
  belongs_to :folder
  has_many :choices
  validates :unseen_responses, presence: true
  validates :responses, presence: true
  validates :active, presence: true
  validates :question, presence: true
  validates :expiration, presence: true
end
