class RenameEventsIdToEventIdInUsers < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :events_id, :event_id
  end
end
