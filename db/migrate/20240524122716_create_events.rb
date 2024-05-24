class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :description
      t.string :url_slug, null: false
      t.string :password
      t.timestamps
    end
  end
end
