class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.integer :responses
      t.integer :unseen_responses
      t.string :question
      t.boolean :active
      t.date :expiration
      t.references :folder, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
