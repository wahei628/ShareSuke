class CreateSchedules < ActiveRecord::Migration[7.1]
  def change
    create_table :schedules do |t|
      t.references :event, null: false, foreign_key: true
      t.date :calendar_date, null: false
      t.timestamps
    end
  end
end
