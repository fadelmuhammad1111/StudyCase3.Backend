BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Course] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [instructor] NVARCHAR(1000) NOT NULL,
    [credits] NVARCHAR(1000) NOT NULL,
    [schedule] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [department] NVARCHAR(1000) NOT NULL,
    [semester] NVARCHAR(1000) NOT NULL,
    [roomNumber] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [createdBy] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Course_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedBy] NVARCHAR(1000),
    [updatedAt] DATETIME2,
    [deletedAt] DATETIME2,
    CONSTRAINT [Course_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
