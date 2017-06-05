CREATE TABLE [dbo].[Position] (
    [Id]            UNIQUEIDENTIFIER NOT NULL,
    [longitude]     REAL             NOT NULL,
    [latitude]      REAL             NOT NULL,
    [altitude]      REAL             NULL,
    [velocity]      REAL             NOT NULL,
    [heading]       REAL             NOT NULL,
    [vertical_rate] REAL             NULL,
    [time]          DATETIME2 (7)    NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

