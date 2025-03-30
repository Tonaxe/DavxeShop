SELECT * FROM [DavxeShop].[dbo].[Users]

UPDATE Users SET Password = '123456789' Where Name = 'Tonaxe'

ALTER TABLE Users ADD Password VARCHAR(300);

EXEC sp_rename 'Users.user_id', 'UserId', 'COLUMN';

INSERT INTO [dbo].[Users] ([Name], [Email], [BirthDate], [City], [Password], [DNI]) VALUES ('Tonaxe', 'tonaxe@gmail.com', '2004-09-06', 'Barcelona', '123456789', '123456789V');


SELECT [DavxeShop].[dbo].[Users] WHERE Password = '$05$FE5ZrkMScJxCdHyLNRCn6.n6jnRraqLN0f8y4phZVe/PGy/LTKk2C'