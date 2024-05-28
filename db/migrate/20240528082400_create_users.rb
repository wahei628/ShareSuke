class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.references :events, null: false, foreign_key: true
      t.string :name, null: false
      t.timestamps
    end
  end
end
