class RenamePasswordColumnToEvents < ActiveRecord::Migration[7.1]
  def change
    rename_column :events, :password, :password_hash
  end
end
