SELECT * FROM [DavxeShop].[dbo].[Users]

UPDATE Users SET Password = '123456789' Where Name = 'Tonaxe'

ALTER TABLE Users ADD Password VARCHAR(300);

EXEC sp_rename 'Users.Ciudad', 'City', 'COLUMN';

