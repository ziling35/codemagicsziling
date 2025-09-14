async function getSqliteDrivers() {
  const sqlite3Module = await import('sqlite3');
  const sqliteModule = await import('sqlite');
  const sqlite3 = sqlite3Module.default ?? sqlite3Module;
  const { open } = sqliteModule;
  return { sqlite3, open };
}

const dbFilename = process.env.KODIFIX_DB_FILE ?? String.raw`C:\sqlite\kodifix.db`;

export default class Database {
  async createUserIfNotExists(user) {
    const { sqlite3, open } = await getSqliteDrivers();
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    const existingUser = await this.db.get("SELECT * FROM users where id = $id", {
      $id: user.id,
    });

    if (!existingUser)
      await this.db.run("INSERT INTO users(id, email, name) VALUES($id, $email, $name)", {
        $id: user.id,
        $email: user.email,
        $name: user.name,
      });

    this.db.close();
  }

  async getUser(userId) {
    const { sqlite3, open } = await getSqliteDrivers();
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    const result = await this.db.get("SELECT * FROM users where id = $userId", {
      $userId: userId,
    });

    this.db.close();
    return result;
  }

  async getAllUserLevels(userId) {
    const { sqlite3, open } = await getSqliteDrivers();
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    const result = await this.db.all("SELECT * FROM user_level where userId = $userId", {
      $userId: userId,
    });

    this.db.close();
    return result;
  }

  async getUserLevel(userId, levelId) {
    const { sqlite3, open } = await getSqliteDrivers();
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    const result = await this.db.get("SELECT * FROM user_level where userId = $userId AND levelId = $levelId", {
      $userId: userId,
      $levelId: levelId,
    });

    this.db.close();
    return result;
  }

  async addUserLevel(userId, levelId, score) {
    const { sqlite3, open } = await getSqliteDrivers();
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    await this.db.run("INSERT INTO user_level(userId, levelId, score) VALUES($userId, $levelId, $score)", {
      $userId: userId,
      $levelId: levelId,
      $score: score
    });

    this.db.close();
  }

  async updateUserLevel(userId, levelId, score) {
    const { sqlite3, open } = await getSqliteDrivers();
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });

    await this.db.run("UPDATE user_level set score = $score where userId = $userId AND levelId = $levelId", {
      $userId: userId,
      $levelId: levelId,
      $score: score
    });

    this.db.close();
  }

  async syncUserLevels(userId, levels) {
    const { sqlite3, open } = await getSqliteDrivers();
    this.db = await open({ filename: dbFilename, driver: sqlite3.Database });
    
    try {
      await this.db.run('BEGIN TRANSACTION');
      
      for (const level of levels) {
        const { levelId, score } = level;
        
        const existingUserLevel = await this.db.get(
          "SELECT * FROM user_level WHERE userId = $userId AND levelId = $levelId", 
          {
            $userId: userId,
            $levelId: levelId,
          }
        );
        
        if (existingUserLevel) {
          if (score > existingUserLevel.score) {
            await this.db.run(
              "UPDATE user_level SET score = $score WHERE userId = $userId AND levelId = $levelId", 
              {
                $userId: userId,
                $levelId: levelId,
                $score: score
              }
            );
          }
        } else {
          await this.db.run(
            "INSERT INTO user_level(userId, levelId, score) VALUES($userId, $levelId, $score)", 
            {
              $userId: userId,
              $levelId: levelId,
              $score: score
            }
          );
        }
      }
      
      await this.db.run('COMMIT');
      return { success: true, syncedCount: levels.length };
    } catch (error) {
      await this.db.run('ROLLBACK');
      throw error;
    } finally {
      this.db.close();
    }
  }
}